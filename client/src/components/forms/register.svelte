<script>
    import axios from 'axios';
    import '$lib/axios.js';
    import { goto } from '$app/navigation';

    import Button, { Label } from '@smui/button';
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';
    import { onMount } from 'svelte';
  
    let error_message = '';

    let username = '';
    let email = '';
    let password = '';
    let password_confirm = '';
    
    $: submit = async () => {
      if(password == password_confirm){
          axios.post('user/register', {
            username: username,
            password: password,
            email: email
          })
          .then(res => {
            if(res.status == 200){
              goto('/login');
            } else {
              console.log(res);
              error_message = res.data.message;
            }

          })
          .catch(err => {
            error_message = err.response.data.message
          });

      } else {
        error_message = 'passwords do not match'
      }

    }
  
  </script>

    <div class='item'>
      <Textfield variant="outlined" bind:value={username} label="username">
      </Textfield>
    </div>

    <div class='item'>
        <Textfield variant="outlined" bind:value={email} label="email">
        </Textfield>
      </div>

    <div class='item'>
        <Textfield variant="outlined" bind:value={password} type="password" label="password">
        </Textfield>
    </div>

    <div class='item'>
        <Textfield variant="outlined" bind:value={password_confirm} type="password" label="confirm password">
        </Textfield>
    </div>

    <div class='item'>
      <Button variant="raised" on:click={submit}>
        <Label>Create Account</Label>
      </Button>
    </div>
    <p style='color:red'>{error_message}</p>
  <style>
    .item {
      margin: 1%
    }
  </style>