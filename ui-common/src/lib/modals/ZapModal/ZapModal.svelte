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
    import CircularTitledButton from "../../components/buttons/CircularTitledButton.svelte";
    import ZapIcon from "../../icons/ZapIcon.svelte";
    import Input from "../../components/Form/Input.svelte";
    import EntryInput from "../../components/Form/EntryInput.svelte";
    import LoadingSpinner from "../../components/Loading/LoadingSpinner.svelte";

    export let event: NDKEvent;
    export let onZapModalClose = async () => {return}

    let _loading = false
    let _errorMessage = ``
    let _weblnPageReload = false

    let zapSent = false;

    let amount = 1000;
    let customAmount = '';
    let hasCustomAmountFocus = false;
    let isValidCustomAmount = true;
    let isCustomAmountSelected = false;
    let comment = '';
    let zapButtonEnabled = true;
    let zapping = false;
    
    let showCustomAmountInput = false;
    //let valueCustomAmount = ``
    let errorCustomAmount = ``

    $: isCustomAmountSelected = ![1000, 10000, 50000, 100000].includes(amount)

    $: {
        if (amount) {
            zapButtonEnabled = true;
        } else {
            if ((!showCustomAmountInput && amount != 0) || (customAmount && isValidCustomAmount)){
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

        if(Number.isNaN(amount) && errorCustomAmount) {
            alert('Specify a number to zap') ;
            return;
        }

        _loading = true
        try {
            const prs: string[] = await Promise.all(
            zapSplits.map((zapSplit) =>
                event.zap(
                    zapSplit[2] * 1000,
                    comment,
                    [],
                    $ndk.getUser({ hexpubkey: zapSplit[0] })  // if this is async, use await
                )));

            event.ndk = $ndk;
            zapping = true;

            for (const pr of prs) {
                if (!pr) {
                    console.log('no payment request');
                    continue
                }

                const webln = await requestProvider();
                await webln.sendPayment(pr);
                zapping = false;
                zapSent = true;
                // TODO we should check here if the payment was successful, with a timer
                // that is canceled here; if the timer doesn't come back, show the modal again
            }
        } catch (e) {
            console.log(`zap modal error: `, e);

            const error_msg = String(e).trim()
            console.log(`error_msg:${error_msg}`);

            let error_tmpl_1 = `Error: Prompt was closed`
            let error_tmpl_2 = `Error: webln.enable() failed`

            if(error_msg.slice(0, error_tmpl_1.length) === error_tmpl_1) {
                _errorMessage = `Zaps require 'webln'.`
                alert(_errorMessage)

            } else if(error_msg.slice(0, error_tmpl_2.length) === error_tmpl_2) {
                _errorMessage = `Reloading the page.`
                _weblnPageReload = true
            }
            
            zapping = false;
            _loading = false
        } finally {
            _loading = false
        }
    }

    type Split = [Hexpubkey, number, number]
    const zapSplits: Split[] = event.getMatchingTags("zap")
        .map((zapTag: NDKTag) => {
            return [zapTag[1], parseInt(zapTag[3]??"1"), 0]
        });

    if (zapSplits.length === 0) {
        zapSplits.push([event.pubkey, 1, 0]);
    }

    let totalSplitValue: number;

    $: totalSplitValue = zapSplits.reduce((acc: number, split: Split) => {
        return acc + split[1];
    }, 0);


    $: {
        if(_weblnPageReload) {
            _weblnPageReload = false
            location.reload()
        }
        
    }
</script>

<ModalWrapper class="max-w-md" bodyClass="p-8" title="Zap" onModalClose={onZapModalClose}>
    <div class="flex max-lg:flex-col flex-row flex-nowrap h-mobileModalContents justify-center gap-4">
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

                    <div class="flex max-lg:flex-col flex-row gap-4">
                        <div class="flex flex-row gap-3">
                            <CircularIconButton title={"1K"} bind:group={amount} value={1000} onButtonClick={async () => { showCustomAmountInput = false } }>
                                <Like />
                            </CircularIconButton>
                            <CircularIconButton title={"10K"} bind:group={amount} value={10000} onButtonClick={async () => { showCustomAmountInput = false } }>
                                <Heart />
                            </CircularIconButton>
                            <CircularIconButton title={"50K"} bind:group={amount} value={50000} onButtonClick={async () => { showCustomAmountInput = false } }>
                                <Fire />
                            </CircularIconButton>
                            <CircularIconButton title={"100K"} bind:group={amount} value={100000} onButtonClick={async () => { showCustomAmountInput = false } }>
                                <Rocket />
                            </CircularIconButton>
                            <CircularTitledButton title={"Custom"} buttonActive={showCustomAmountInput} onClick={async () => { amount = showCustomAmountInput ? 1000 : 0; showCustomAmountInput = !showCustomAmountInput }}>
                                <ZapIcon />
                            </CircularTitledButton>
                        </div>
                    </div>
                    
                    <div class="flex flex-col w-full justify-center items-center pt-4 gap-4">
                        {#if showCustomAmountInput}
                            <div class="flex flex-col w-full justify-center items-center">
                                <EntryInput 
                                    placeholder="Zap custom amount..." 
                                    onInputCallback={async () => { errorCustomAmount = `` }}
                                    onInputValidation={async v => /^[0-9]\d*$/.test(v)}
                                    onInputValidationSuccess={async v => { amount = Number(v) }}
                                    onInputValidationFailure={async () => { amount = 0; errorCustomAmount = `Please enter a number.` }}
                                }} />
                            </div>
                            {#if errorCustomAmount}
                                <div class="flex flex-row w-full justify-center items-center">
                                    <p class="font-sans font-light text-sm">
                                        {`${errorCustomAmount}`}
                                    </p>
                                </div>
                            {/if}
                        {/if}
                        <Input
                            _class="w-full"
                            maxlength="50"
                            placeholder="Add a comment..."
                            bind:value={comment}/>
                    </div>
                </div>

                <AttentionButton on:click={zap} class="{!zapButtonEnabled ? 'btn-disabled' : ''}">
                    Zap
                    {nicelyFormattedSatNumber(amount)}
                    sats
                </AttentionButton>

                {#if _loading}
                    <div class="flex flex-row w-full justify-center items-center">
                        <div class="flex flex-row gap-2">
                            <LoadingSpinner class="h-3 w-3 text-stone-200" />
                            <p class="font-sans font-medium text-sm">
                                {`Loading 'webln'`}
                            </p>
                        </div>
                    </div>
                {:else if !!_errorMessage}
                    <div class="flex flex-col w-full justify-center items-center">
                        <p class="font-sans font-medium text-sm">
                            {`${_errorMessage}`}
                        </p>
                    </div>
                {/if}

            </div>
        {/if}
    </div>
</ModalWrapper>
