import Joi from "joi";

const jobValidationSchema = Joi.object({
  companyName: Joi.string().trim().required(),
  logoUrl: Joi.string()
    .trim()
    .uri()
    .pattern(/\.(png|jpg|jpeg|gif|svg)$/)
    .optional(),
  jobPosition: Joi.string().trim().lowercase().required(),
  monthlySalary: Joi.number().min(1).required(),
  jobType: Joi.string()
    .valid("Full-time", "Part-time", "Internship")
    .default("Full-time"),
  jobLocation: Joi.string()
    .valid("Remote", "Office", "Hybrid")
    .default("Office"),
  companyLocation: Joi.string().trim().required(),
  jobDescription: Joi.string().trim().required(),
  aboutCompany: Joi.string().trim().required(),
  skillRequired: Joi.array()
    .items(Joi.string().trim().lowercase())
    .min(1)
    .required(),
  additionalInfo: Joi.string().trim().optional(),
});

export { jobValidationSchema };
