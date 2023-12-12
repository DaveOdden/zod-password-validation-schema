"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customZodSchema = void 0;
const zod_1 = require("zod");
const MIN_LENGTH = 6;
const FIELD_VALIDATION = {
    TEST: {
        SPECIAL_CHAR: (value) => /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(value),
        LOWERCASE: (value) => /[a-z]/.test(value),
        UPPERCASE: (value) => /[A-Z]/.test(value),
        NUMBER: (value) => /.*[0-9].*/.test(value),
    },
    MSG: {
        MIN_LEN: `Password must have ${MIN_LENGTH} characters`,
        SPECIAL_CHAR: "Password must contain atleast one special character",
        LOWERCASE: "Password must contain at least one lowercase letter",
        UPPERCASE: "Password must contain at least one uppercase letter",
        NUMBER: "Password must contain at least one number",
        MATCH: "Password must match",
    },
};
const patterns = zod_1.z
    .string()
    .min(MIN_LENGTH, {
    message: FIELD_VALIDATION.MSG.MIN_LEN,
})
    .refine(FIELD_VALIDATION.TEST.SPECIAL_CHAR, FIELD_VALIDATION.MSG.SPECIAL_CHAR)
    .refine(FIELD_VALIDATION.TEST.LOWERCASE, FIELD_VALIDATION.MSG.LOWERCASE)
    .refine(FIELD_VALIDATION.TEST.UPPERCASE, FIELD_VALIDATION.MSG.UPPERCASE)
    .refine(FIELD_VALIDATION.TEST.NUMBER, FIELD_VALIDATION.MSG.NUMBER);
exports.customZodSchema = zod_1.z
    .object({
    password: patterns,
    confirmPassword: patterns,
})
    .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        addFieldIssue("password", ctx);
        addFieldIssue("confirmPassword", ctx);
    }
});
const addFieldIssue = (field, ctx) => {
    ctx.addIssue({
        code: "custom",
        message: FIELD_VALIDATION.MSG.MATCH,
        path: [field],
        fatal: true,
    });
};
