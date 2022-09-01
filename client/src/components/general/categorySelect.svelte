<script>
    import {onMount} from 'svelte';
    import Select, {Option} from '@smui/select';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';
    import axios from 'axios';
    import '$lib/axios.js';
    
    export let value = '';

    let open = false;
    let clicked = '';
    let inputval = '';
    let category_options = [];

    onMount(() => {
          getCategories();
        }
    );

    $: getCategories = async () => {
        const {data} = await axios.get('categories/', {});
            
        category_options = data.categories;
    }

    $: submit = async () => {
        const {data} = await axios.post('categories/create', {
            name: inputval
        });

        getCategories();
    }

</script>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">New Category</Title>
  <Content id="simple-content">
    <Textfield bind:value={inputval} label="Name">
    </Textfield>
  </Content>
  <Actions>
    <Button on:click={submit}>
      <Label>Create</Label>
    </Button>
  </Actions>
</Dialog>

<Button style='margin: 2%' variant='raised' on:click={() => (open = true)} value={'new'}>New</Button>
<Select bind:value={value} label='category'>
    {#each category_options as category}
        <Option value={category.name}>{category.name}</Option>
    {/each}
</Select>