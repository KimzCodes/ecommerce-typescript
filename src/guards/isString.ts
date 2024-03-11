const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export default isString;
