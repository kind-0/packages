<script lang="ts">
    import type { NDKDVMJobResult, NDKEvent } from "@nostr-dev-kit/ndk";
	import { CheckCircle, Lightning } from "phosphor-svelte";
	import { slide } from "svelte/transition";
    import AttentionButton from "../../../buttons/AttentionButton.svelte";
    import { pay as payPaymentRequest } from "../../../../utils/pay";
    import { newToasterMessage } from "../../../../stores/toaster";

    export let event: NDKDVMJobResult | NDKEvent;


    let amountInMsats: number;
    let invoice: string | null;
    const amountTag = event.getMatchingTags("amount")[0];

    let paying = false;
    let paid = false;
    let error: string | undefined = undefined;

    if (amountTag) {
        amountInMsats = parseInt(amountTag[1]);
        invoice = amountTag[2];
    }

    async function pay() {
        if (!amountInMsats || paid) return;

        paying = true;

        try {
            if (!invoice) {
                invoice = await event.zap(amountInMsats);
            }

            if (!invoice) {
                paying = false;
                newToasterMessage('Could not get invoice from event', "error");
                return;
            }

            payPaymentRequest(invoice).then(({preimage}) => {
                paying = false;
                if (preimage) {
                    paid = true;
                }
            }).catch((e: any) => {
                paying = false;
            })

            // TODO we should check here if the payment was successful, with a timer
            // that is canceled here; if the timer doesn't come back, show the modal again
            // or instruct the user to do something with the failed payment
        } catch (err: any) {
            error = err.message ?? err;
            setTimeout(() => {
                error = undefined
            }, 5000);
            paying = false;
            console.log(err);
            return;
        }
    }
</script>

{#if error}
    <div class="toast toast-end" transition:slide>
        <div class="alert alert-error">
            <span>{error}</span>
        </div>
    </div>
{/if}

<div class="flex flex-col gap-2">
    <AttentionButton class="
        w-full flex-nowrap whitespace-nowrap
        {$$props.class??""}
    " on:click={pay}>
        {#if paying}
            <span class="loading loading-sm"></span>
        {:else if paid}
            <CheckCircle class="text-success" />
            Paid
        {:else}
            PAY
        {/if}
        <Lightning />
        {#if amountInMsats}
            {amountInMsats/1000} sats
        {/if}
    </AttentionButton>

</div>