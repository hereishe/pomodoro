<script>
  import axios from 'axios';
  import '$lib/axios.js';
  
  import { goto } from '$app/navigation';
  import { authenticated } from '$lib/stores.js';
  import Button, { Label } from '@smui/button';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import { onMount } from 'svelte';
  import {error, redirect} from '@sveltejs/kit';

  let error_message = '';
  let username = '';
  let password = '';
  let session_id = 'waiting for cookie';
  let response = 'waiting...';
  let result = '';

  $: submit = async () => {
    try {
      const {data} = await axios.post('user/login', {
        username: username,
        password: password
      }, {withCredentials: true});

      authenticated.set(true);

      axios.defaults.headers.common['Authorization'] = data.token;
      goto('/dashboard');

    } catch (error) {
      error_message = 'login error';
    }

  }

</script>
  <div class='item'>
    <Textfield variant="outlined" bind:value={username} label="username">
    </Textfield>
  </div>

  <div class='item'>
    <Textfield variant="outlined" bind:value={password} type="password" label="password">
    </Textfield>
  </div>

  <div class='item'>
    <Button variant="raised" on:click={submit}>
      <Label>Sign In</Label>
    </Button>
  </div>
  <p style='color:red'>{error_message}</p>
<style>
  .item {
    margin: 1%
  }
</style>