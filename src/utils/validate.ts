type FData<T> = {
  [key in keyof T]: string | number | undefined | null | "";
};
type Rule<T> = {
  key: keyof T;
  message: string;
} & (
  | { type: "required" }
  | {
      type: "pattern";
      regexp: RegExp;
    }
);
type Rules<T> = Rule<T>[];
function hasError(errors: Record<string, string[]>) {
  return (
    Object.values(errors).reduce(
      (result: number, i) => (result += i.length),
      0
    ) > 0
  );

  let result = false;
  for (let key in errors) {
    if (errors[key].length > 0) {
      result = true;
      break;
    }
  }
  return result;
}
export type { Rule, FData, Rules };
export { hasError };
const validate = <T>(formData: FData<T>, rules: Rules<T>) => {
  type Errors = {
    [key in keyof T]?: String[];
  };
  const errors: Errors = {};
  rules?.forEach((rule) => {
    const { type, message, key } = rule;
    const value = formData[key];
    if (rule.type === "required") {
      //条件判断可以使用switch
      if (!value) {
        errors[key] = errors[key] || [];
        errors[key]?.push(message);
      }
    } else if (rule.type === "pattern") {
      const regexp = rule.regexp;
      if (value && !regexp.test(value?.toString())) {
        errors[key] = errors[key] || [];
        errors[key]?.push(message);
      }
    }
  });
  return errors;
};

export default validate;
