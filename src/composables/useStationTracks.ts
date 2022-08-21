import { useStationStore } from '@/store/station';
import useRequest from '@/composables/useRequest';
import StationTracksInterface from '@/interfaces/StationTracksInterface';

interface Params {
    settings2?: boolean;
    queue?: number;
}

export default async function useStationTracks(settings = true, trackIdBefore = -1) {
    const stationStore = useStationStore();
    const currentStation = stationStore.current;
    const params: Params = {};

    if (settings) { params.settings2 = true; }
    if (trackIdBefore) { params.queue = trackIdBefore; }

    const res = await useRequest().get(`rotor/station/${currentStation.id.type}:${currentStation.id.tag}/tracks`, {
        data: params
    });

    stationStore.setCurrentBatchId(res.data.result.batchId);

    return (res.data.result as StationTracksInterface).sequence.map(item => {
        item.track.liked = item.liked;
        return item.track;
    });
}
