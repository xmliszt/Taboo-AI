import { useCallback, useEffect, useState } from 'react';
import { DataSnapshot } from 'firebase/database';

import { listenToAppStats } from '../services/appService';

export interface AppStatsProps {
  views: number;
}
export const useAppStats = () => {
  const [stats, setStats] = useState<AppStatsProps>();

  const onSnapshotUpdated = useCallback((snapshot: DataSnapshot) => {
    const data = snapshot.val() as AppStatsProps;
    setStats(data);
  }, []);

  useEffect(() => {
    listenToAppStats(onSnapshotUpdated);
  }, [onSnapshotUpdated]);

  return { stats };
};
