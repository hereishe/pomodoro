<script>

    import LoginForm from '../../components/forms/login.svelte';
    
</script>

<div class='container'>
    
    <div class='login-parent'>
        <h1>Log In</h1>
        <LoginForm></LoginForm>
        <a href='/register'>Create an account</a>
    </div>

</div>

<style>
    .login-parent {
        text-align: center;
    }
</style>