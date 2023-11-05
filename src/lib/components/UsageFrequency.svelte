<script lang="ts">
  export let value: number; // 1-5

  $: filter = `hue-rotate(${105 + 25 * value}deg)`;

  // const texts: { [idx: number]: string } = {
  // 	1: 'very uncommon or not used anymore',
  // 	2: 'uncommon',
  // 	3: 'somewhat common',
  // 	4: 'common',
  // 	5: 'very common'
  // };

  // $: text = texts[value];
</script>

<div class="flex" title="Occurences in reddit comments (March 2023)">
  {#each Array(5) as _, idx}
    <div class="">
      <img
        alt=""
        class="w-[1.5em] h-[1.5em] -ml-1 mr-1"
        src="/favicon.svg"
        style={`filter: ${idx < value ? filter : "grayscale(100%)"};`}
      />
    </div>
  {/each}
  <!-- <div class="ml-2">
		{text} 
	</div> -->
</div>
