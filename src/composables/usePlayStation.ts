import useSendStationFeedback from '@/composables/useSendStationFeedback';
import { StationFeedbackTypeEnum } from '@/enums/StationFeedbackTypeEnum';
import useStationTrack from '@/composables/useStationTracks';
import { useQueueStore } from '@/store/queue';
import { usePlayerStore } from '@/store/player';
import { useStationStore } from '@/store/station';
import { Station2 } from '@/interfaces/StationDashboardInterface';

export default async function usePlayStation(station: Station2) {
    const queueStore = useQueueStore();

    queueStore.clearQueue();
    usePlayerStore().setIsStation(true);
    useStationStore().setCurrent(station);

    await useSendStationFeedback(StationFeedbackTypeEnum.RADIO_STARTED);

    queueStore.setQueue(await useStationTrack());
}
