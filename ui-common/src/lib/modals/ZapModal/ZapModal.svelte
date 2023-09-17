<script lang="ts">
    import { ndk } from "../../stores/ndk.js";
    import type { Hexpubkey, NDKEvent, NDKTag } from '@nostr-dev-kit/ndk';
    import { requestProvider } from 'webln';

    import { closeModal } from 'svelte-modals';
    import Heart from '../../icons/Heart.svelte';
    import Like from '../../icons/Like.svelte';
    import Fire from '../../icons/Fire.svelte';
    import Rocket from '../../icons/Rocket.svelte';
    import ZapSent from '../../icons/ZapSent.svelte';
    import CheckSimple from '../../icons/CheckSimple.svelte';
    import ModalWrapper from "../../components/modals/ModalWrapper.svelte";
    import SubtleButton from "../../components/buttons/SubtleButton.svelte";
    import ZapUserSplit from "./ZapUserSplit.svelte";
    import CircularIconButton from "../../components/buttons/CircularIconButton.svelte";
    import AttentionButton from "../../components/buttons/AttentionButton.svelte";
    import { nicelyFormattedSatNumber } from "../../utils/bitcoin.js";

    export let event: NDKEvent;

    let zapSent = false;

    let amount = 1000;
    let customAmount = '';
    let hasCustomAmountFocus = false;
    let isValidCustomAmount = true;
    let isCustomAmountSelected = false;
    let comment = '';
    let zapButtonEnabled = true;
    let zapping = false;

    $: isCustomAmountSelected = ![1000, 10000, 50000, 100000].includes(amount)

    $: {
        if (amount) {
            zapButtonEnabled = true;
        } else {
            if (customAmount && isValidCustomAmount){
                zapButtonEnabled = true;
            } else {
                zapButtonEnabled = false;
            }
        }
    }

    let focusCustomInput = () => {
        hasCustomAmountFocus = true;
        if (customAmount) {
            isCustomAmountSelected = true;
            amount = 1000;
        }
    }

    let validateCustomAmount = () => {
        // Should be positive integer
        isValidCustomAmount = /^\+?(0|[1-9]\d*)$/.test(customAmount);
        console.log({isValidCustomAmount})
        if (isValidCustomAmount){
            amount = parseInt(customAmount);
            isCustomAmountSelected = true;
        }
    }

    let clearCustomAmount = () => {
        if (!isValidCustomAmount) {
            customAmount = ''
            isValidCustomAmount = true
            isCustomAmountSelected = false
        }
    }

    async function zap() {
        // closeModal();

        const prs: string[] = await Promise.all([
            zapSplits.map(zapSplit =>
                event.zap(
                    zapSplit[2] * 1000,
                    comment,
                    [],
                    $ndk.getUser({hexpubkey: zapSplit[0]})
                )
            )
        ]);

        event.ndk = $ndk;
        zapping = true;

        for (const pr of prs) {
            if (!pr) {
                console.log('no payment request');
                continue
            }

            try {
                const webln = await requestProvider();
                await webln.sendPayment(pr);
                zapping = false;
                zapSent = true;
                // TODO we should check here if the payment was successful, with a timer
                // that is canceled here; if the timer doesn't come back, show the modal again
                // or instruct the user to do something with the failed payment
            } catch (err: any) {
                zapping = false;
                return;
            }
        }
    }

    type Split = [Hexpubkey, number, number]
    const zapSplits: Split[] = event.getMatchingTags("zap")
        .map((zapTag: NDKTag) => {
            return [zapTag[1], parseInt(zapTag[2]??"1"), 0]
        });

    if (zapSplits.length === 0) {
        zapSplits.push([event.pubkey, 1, 0]);
    }

    let totalSplitValue: number;

    $: totalSplitValue = zapSplits.reduce((acc: number, split: Split) => {
        return acc + split[1];
    }, 0);
</script>

<ModalWrapper class="max-w-md" bodyClass="p-8" title="Zap">
    {#if zapSent}
        <div class="flex flex-col items-center justify-center">
            <div>
                <ZapSent class="h-[267px]"/>
            </div>
            <SubtleButton handleClick={closeModal} class="w-fit">
                <span class="glow flex items-center gap-3 text-base-100-content text-base leading-normal font-normal">
                    <CheckSimple class="text-accent"/>
                    Zap Sent
                </span>
            </SubtleButton>
        </div>

    {:else}
        <div class="flex flex-col gap-8">
            <div class="flex flex-col gap-4">
                <div
                    class="text-base-300-content text-sm font-semibold tracking-widest"
                    class:hidden={zapSplits.length === 1}
                >SPLITS</div>
                {#if zapSplits}
                    {#each zapSplits as zapSplit}
                        <ZapUserSplit
                            pubkey={zapSplit[0]}
                            bind:split={zapSplit[1]}
                            bind:satSplit={zapSplit[2]}
                            {totalSplitValue}
                            totalSatsAvailable={amount}
                            hideRange={zapSplits.length === 1}
                        />
                    {/each}
                {/if}
                <!-- TODO add other people involved in the highlight? -->
            </div>

            <div class="flex flex-col gap-3">
                <div class="text-base-300-content text-sm font-semibold tracking-widest">AMOUNT</div>

                <div class="flex flex-row gap-4">
                    <div class="flex flex-row gap-3">
                        <CircularIconButton title={"1K"} bind:group={amount} value={1000}>
                            <Like />
                        </CircularIconButton>
                        <CircularIconButton title={"10K"} bind:group={amount} value={10000}>
                            <Heart />
                        </CircularIconButton>
                        <CircularIconButton title={"50K"} bind:group={amount} value={50000}>
                            <Fire />
                        </CircularIconButton>
                        <CircularIconButton title={"100K"} bind:group={amount} value={100000}>
                            <Rocket />
                        </CircularIconButton>
                    </div>
                    <div class="w-full flex flex-col items-center">
                        <input
                            type="text"
                            maxlength="50"
                            class="
                                input text-center w-full  rounded-full h-11 mb-2
                                w-48
                                border-1 {isCustomAmountSelected ? 'border-accent': 'border-neutral-800'}
                                focus:ring-transparent focus:border-accent
                                {isValidCustomAmount ? '!bg-transparent' : '!bg-error !bg-opacity-20'}
                            "
                            bind:value={customAmount}
                            on:focus={focusCustomInput}
                            on:blur={clearCustomAmount}
                            on:input={validateCustomAmount}/>
                        <span class="text-xs text-center font-normal text-base-100-content">
                            Custom
                        </span>
                    </div>
                </div>
            </div>

            <input
                type="text"
                maxlength="50"
                class="
                    input text-start text-base px-6 w-full  rounded-full h-11
                    border-1 border-neutral-800 focus:ring-transparent focus:border-neutral-800
                    !bg-transparent
                "
                placeholder="Add a comment..."
                bind:value={comment}/>

            <AttentionButton on:click={zap} class="{!zapButtonEnabled ? 'btn-disabled' : ''}">
                {#if zapping}
                    <span class="loading loading-sm opacity-50"></span>
                {:else}
                    Zap
                    {nicelyFormattedSatNumber(amount)}
                    sats
                {/if}
            </AttentionButton>
        </div>
    {/if}
</ModalWrapper>
