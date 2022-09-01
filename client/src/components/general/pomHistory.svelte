<script>
    import {onMount} from 'svelte';
    import axios from 'axios';
    import '$lib/axios.js';

    import Button, { Label } from '@smui/button';
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

    let pom_history = [];

    onMount(() => {
        getPomHistory();
    })

    export const getPomHistory = async () => {
        const {data} = await axios.get('pomodoro/',{});

        console.log(data);
        pom_history = data.pom_list;
    };

</script>
<DataTable table$aria-label="Pomodoro History" style="max-width: 100%;">
    <Head>
        <Row>
        <Cell>Time Completed</Cell>
        <Cell>Category</Cell>
        </Row>
    </Head>
    <Body>
        {#each pom_history as pom}
        <Row>
            <Cell>{
                new Date(pom.timeFinished).toLocaleString()    
            }</Cell>
            <Cell>{pom.category}</Cell>
        </Row>
        {/each}
    </Body>
    </DataTable>