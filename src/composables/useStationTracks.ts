import { useStationStore } from '@/store/station';
import useRequest from '@/composables/useRequest';
import StationTracksInterface from '@/interfaces/StationTracksInterface';

export default async function useStationTrack(settings = true, trackIdBefore = -1) {
    const stationStore = useStationStore();
    const currentStation = stationStore.current;
    const params = trackIdBefore ? { queue: trackIdBefore } : (settings ? { settings: true } : false);
    const res = await useRequest().get(`rotor/station/${currentStation.id.type}:${currentStation.id.tag}/tracks`, {
        data: params
    });

    stationStore.setCurrentBatchId(res.data.result.batchId);

    return (res.data.result as StationTracksInterface).sequence.map(item => {
        item.track.liked = item.liked;
        return item.track;
    });
}
