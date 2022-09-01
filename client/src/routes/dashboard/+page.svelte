<script >
    import {onMount} from 'svelte';
    import axios from 'axios';
    import '$lib/axios.js';

    import PomHistory from '../../components/general/pomHistory.svelte';
    import Pomodoro from '../../components/general/pomodoro.svelte';
    import Categoryselect from '../../components/general/categorySelect.svelte';

    let category = '';
    let pomHistory;

    function handlePomFinished(){
        console.log('test');
        pomHistory.getPomHistory();
    }
    
</script>

<div id="dashboard-parent">
    <div class="grid-item">
        <PomHistory bind:this={pomHistory}/>
    </div>
    <div class="grid-item">
        <Pomodoro category={category} on:pomfinished={handlePomFinished}/>
    </div>
    <div class="grid-item">
        <Categoryselect bind:value={category}/>
    </div>
    
</div>

<style>

    #dashboard-parent {
        /* text-align:center; */
		display:grid;
		grid-template-columns:auto auto auto;
	}

</style>