<script>
    import axios from 'axios';
    import '$lib/axios.js';
    import {tweened} from 'svelte/motion';
    import CircularProgress from '@smui/circular-progress';
    import { onMount, createEventDispatcher } from 'svelte';
    import Button, { Label } from '@smui/button';
    import Switch from '@smui/switch';

    export let category = '';

    const dispatch = createEventDispatcher();

    let test_mode = false;
    let interval = 0;
    let success = false;
    let error_message = '';

    $: pomLength = test_mode ? 10 : 1500;
    $: timer = tweened(pomLength);
    $: minutes = Math.floor($timer / 60);
    $: seconds = Math.floor($timer - minutes * 60)
    $: progress = 1 - ($timer / pomLength);

    $: start = () => {
        if(category){
            error_message = '';
            success = true;
            interval = window.setInterval(() => {
                if ($timer > 0){
                    $timer--
                } else {
                    if(success){
                        pomFinished();
                    }
                    timer = tweened(pomLength);
                    window.clearInterval(interval);
                }
            }, 1000);
        } else {
            error_message = 'please select a category';
        }
    };

    $: stop = () => {
        success = false;
        $timer = 0;
    }
    
    $: pomFinished = async () => {
        const {data} = await axios.post('pomodoro/', {
            category: category
        });
        console.log('senddispatch');
        dispatch('pomfinished', {});
    }
    


</script>
<div style="text-align: center">
    <div style="display:inline-block, margin:auto">
        <h1>{ minutes + ':' + seconds}</h1>
    </div>
    <div style="display:inline-block, margin:auto">
        <CircularProgress style="height: 380px; width: 380px;" {progress}/>
    </div>
    <div style="display:inline-block, margin:auto">
        <Button variant="raised" on:click={start}>
            <Label>Start</Label>
        </Button>
        <Button variant="raised" on:click={stop}>
            <Label>Stop</Label>
        </Button>
    </div>
    <div>
        <p>Test Mode (10s pomodoro):</p><Switch bind:checked = {test_mode}/>
        <p style='color:red'>{error_message}</p>
    </div>
</div>