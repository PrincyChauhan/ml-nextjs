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
        let modalName = history.graphType;
        switch (modalName) {
            case "knn_matrix_roc":
              modalName = "KNN";
                break;
            case "SVM":
              modalName = "SVM";
                break;
            case "knn_matrix_roc":
              modalName = "KNN";
                break;
            case "accu_comp_graph":
              modalName = "Comparison Graph";
                break;

            default:
              modalName;
                break;
        }

        return {
            id: history.id,
            accuracy: history.accuracy,
            modalName: modalName,
            createdAt: `${history.createdAt.toLocaleDateString()} ${history.createdAt.toLocaleTimeString()}`, // Format Date
        };
    }
  );

  return userHistoryWithDetails;
};
