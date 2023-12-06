import * as z from "zod";

export const formSchema = z.object({
  graphTypes: z.string().nonempty({ message: "GraphTypes is required" }),
});

export const graphTypes = [
  { label: "SVM", value: "svm_act_roc_curve" },
  { label: "Logistic Regression", value: "logistic_act_roc_curve" },
  { label: "KNN", value: "knn_act_roc_curve" },
  { label: "Comparison Graph", value: "accu_comp_graph_new" },
];
