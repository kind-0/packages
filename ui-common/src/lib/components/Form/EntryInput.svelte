<script lang="ts">
    let element: HTMLInputElement;
    export let onInputCallback = async (_ = ``) => {return}
    export let onInputValidation = async (_: string) => true
    export let onInputValidationSuccess = async (_: string) => {return}
    export let onInputValidationFailure = async (_: string) => {return}
    export let onKeyDeleteCallback = true

    let _value = ``
</script>

<input
    bind:this={element}
    bind:value={_value}
    on:input={async ({currentTarget:{value}}) => {
        _value = value
        await onInputCallback(value)
        let pass = await onInputValidation(value)
        pass ? await onInputValidationSuccess(value) : await onInputValidationFailure(value)
    }}
    on:keydown={async ({key}) => {
        if(key === `Backspace` && !_value) onKeyDeleteCallback ? await onInputCallback() : null
    }}
    placeholder={$$props.placeholder || ``}
    class="
        input input-bordered w-full focus:outline-0 focus:ring-0 rounded-xl border-2 border-base-300
    {$$props.class??""}
" />