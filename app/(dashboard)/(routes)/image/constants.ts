import * as z from "zod";

export const formSchema = z.object({
  graphTypes: z.string().nonempty({ message: "GraphTypes is required" }),
});

export const graphTypes = [
  { label: "SVM", value: "SVM" },
  { label: "Logistic Regression", value: "logistic_roc_curve" },
  { label: "KNN", value: "knn_matrix_roc" },
  { label: "Comparison Graph", value: "accu_comp_graph" },
];
