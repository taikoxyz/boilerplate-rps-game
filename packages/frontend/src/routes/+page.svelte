<script lang="ts">
	import classNames from "classnames";
	import Registration from "../components/Registration.svelte";

    const wrapperClasses = classNames(
        'w-[100vw]',
        'h-[100vh]',
        'overflow-hidden',
        'fixed',
        'top-0',
        'left-0',
        'flex','flex-col',
        'items-center',
        'justify-center',
    )
</script>


<svelte:head>
  <title>w3 Rock-Paper-Scissors</title>
  </svelte:head>

<div class={wrapperClasses}>
    <Registration/>
</div>
