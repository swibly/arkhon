<script lang="ts">
    let hidden: { [x: string]: boolean } = {
        email: true,
        password: true,
        confirm: true
    } as const;
    
    function enableInput(field: string, value: string, match: RegExp) {
        hidden[field] = !match.test(value);
        const item = document.getElementsByName(field)[0] as HTMLInputElement;
        if (!item) return;
        item.style.opacity = !hidden[field] ? "1" : "0";
    }

    function enablePassword(e: KeyboardEvent) {
        enableInput("password", (e.target as HTMLInputElement).value, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi);
    }

    function enableConfirm(e: KeyboardEvent) {
        enableInput("confirm", (e.target as HTMLInputElement).value,  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gi);
    }
</script>

<div class="*:input *:input-bordered *:transition-all">
    <input type="text" name="email" aria-hidden={hidden["email"]} on:keyup={enablePassword}>
    <input type="text" name="password" aria-hidden={hidden["password"]} on:keyup={enableConfirm} style="opacity: 0;">
    <input type="text" name="confirm" aria-hidden={hidden["confirm"]}  style="opacity: 0;">
</div>