<script lang="ts">
	import classNames from "classnames";


    const wrapperClasses = classNames(
        'flex',
        'flex-col',
        'gap-[10px]'
    )

    const inputClasses = classNames(
        "input","input-bordered","w-full","max-w-xs"
    )
</script>


<div class={wrapperClasses}>
    <h1>Register</h1>
    <input type="text" placeholder="NFT Address" class={inputClasses} />
    <input type="text" placeholder="Token ID" class={inputClasses} />

    <select class="select select-bordered w-full max-w-xs">
        <option disabled selected>Select your move</option>
        <option>Rock</option>
        <option>Paper</option>
        <option>Scissor</option>

      </select>
    <button class="btn btn-primary">Submit</button>
</div>
