import { defineRule } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';

Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
});

defineRule('required', value => {
    if (!value || !value.length) {
        return 'This field is required';
    }

    return true;
});
defineRule('email', value => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return true;
    }

    // Check if email
    if (!/^[^@]+@\w+(\.\w+)+\w$/.test(value)) {
        return 'This field must be a valid email';
    }

    return true;
});
defineRule('confirmed', (value, [target], ctx) => {
    if (value === ctx.form[target]) {
        return true;
    }

    return 'Passwords must match';
});