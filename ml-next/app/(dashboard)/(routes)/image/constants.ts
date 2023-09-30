import * as z from "zod";

export const formSchema = z.object({
  graphTypes: z.string().nonempty({ message: "GraphTypes is required" }),
});

export const graphTypes = [
  { label: "compute_roc", value: "compute_roc" },
  { label: "accu_comp_graph", value: "accu_comp_graph" },
  { label: "SVM", value: "SVM" },
];
