import { useStationStore } from '@/store/station';
import { StationFeedbackTypeEnum } from '@/enums/StationFeedbackTypeEnum';
import useRequest from '@/composables/useRequest';

export default async function useSendStationFeedback(type: StationFeedbackTypeEnum, batchId?: boolean, totalPlayedSeconds?: number | null, trackId?: number): Promise<boolean> {
    const stationStore = useStationStore();
    const currentStation = stationStore.current;
    let url = `rotor/station/${currentStation.id.type}:${currentStation.id.tag}/feedback?`;
    if (batchId) {
        url += `batchId=${stationStore.currentBatchId}`;
    }

    const data = {
        type: type,
        timestamp: new Date().toISOString(),
        trackId: trackId,
        totalPlayedSeconds: totalPlayedSeconds
    };

    const dataFilled = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== null));

    const res = await useRequest().post(url, dataFilled);

    return res.data.result === 'ok';
}
