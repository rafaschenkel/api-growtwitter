export function validateFields(body: any, fields: string[]) {
  let errors = [];
  if (Object.keys(body).length === 0) errors.push("Body is empty");

  fields.forEach((field) => {
    if (!body[field]) errors.push(`${field} is required`);
    if (typeof body[field] !== "string") errors.push(`${field} must be a string`);
  });

  return errors;
}
