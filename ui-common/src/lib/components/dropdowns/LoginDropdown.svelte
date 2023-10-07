<script lang="ts">
	import CollapsableDropdown from './CollapsableDropdown.svelte';
    import LoginNip07Button from '../buttons/LoginNip07Button.svelte';
    import AttentionButton from '../buttons/AttentionButton.svelte';

    export let loginNip07: (e: MouseEvent) => void;
    export let loginAsGuest: (e: MouseEvent) => void | undefined;
</script>


<CollapsableDropdown>
	<button
		slot="dropdown-btn-open"
		class="btn btn-outline rounded-full border-accent bg-transparent text-base-100-content text-sm md:text-base normal-case hover:border-accent hover:bg-accent hover:bg-opacity-20 hover:text-base-100-content"
	>
		<span class="px-0 md:px-4 lg:px-9"> Log In </span>
	</button>

	<div slot="dropdown-content" class="w-sidebar absolute right-0 mt-2 shadow-xl rounded-xl bg-base-200 transition-all">
		<ul
			class="divide-y divide-neutral-800"
		>
			<div>
				<div class="flex justify-center menu-title">
					<div class="p-1 text-center text-base font-medium text-base-100-content">Log In</div>
				</div>
			</div>
			<div class="p-4">
				<div class="flex flex-col items-start px-4">
                    <slot>
                        <span class="text-xs text-base">
                            This app is a tool built using the <span class="text-accent">Nostr Protocol</span>,
                            which means you can login using keys instead of a centralized identity provider.
                        </span>
                    </slot>
				</div>
			</div>

			{#if loginAsGuest}
				<div class="p-4">
					<div class="flex justify-center">
						<div class="flex flex-col gap-2 w-full">
							<div class="text-center text-xs font-normal">New to all this?</div>
							<AttentionButton on:click={loginAsGuest}>
								<div class="flex items-center gap-2">
									<span >Continue as Guest</span>
								</div>
							</AttentionButton>
						</div>
					</div>
				</div>
			{/if}
			<div class="p-4">
				<div class="flex justify-center">
					<div class="flex flex-col gap-2 w-full">
						<div class="text-center text-xs font-normal">Already on Nostr?</div>
						<LoginNip07Button {loginNip07} />
						<!-- <LoginNip46Button /> -->
					</div>
				</div>
			</div>
		</ul>
	</div>
</CollapsableDropdown>
