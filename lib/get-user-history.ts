import { db } from "@/lib/db";
import { initialProfile } from "./initial-profile";
import { UserHistoryColumn } from "@/app/(dashboard)/(routes)/history/columns";

export const getUserHistroy = async () => {
  const user = await initialProfile();

  if (!user) return;

  const userHistory = await db.userHistory.findMany({
    // where: { userId: user.id },
    include: {
      user: true,
    },
  });

  const userHistoryWithDetails: UserHistoryColumn[] = userHistory.map(
    (history) => {
        let graphType = history.graphType;
        switch (graphType) {
            case "knn_matrix_roc":
                graphType = "KNN";
                break;
            case "SVM":
                graphType = "SVM";
                break;
            case "knn_matrix_roc":
                graphType = "KNN";
                break;
            case "accu_comp_graph":
                graphType = "Comparison Graph";
                break;

            default:
                graphType;
                break;
        }

        return {
            id: history.id,
            userName: history.user.name,
            accuracy: history.accuracy,
            graphType: graphType,
            createdAt: `${history.createdAt.toLocaleDateString()} ${history.createdAt.toLocaleTimeString()}`, // Format Date
        };
    }
  );

  return userHistoryWithDetails;
};
