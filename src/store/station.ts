import { defineStore } from 'pinia';
import StationListInterface from '@/interfaces/StationListInterface';
import StationDashboardInterface, { Station2 } from '@/interfaces/StationDashboardInterface';
import StationListMapInterface from '@/interfaces/StationListMapInterface';

interface State {
    dashboard: StationDashboardInterface;
    listKeys: Array<string>;
    list: StationListMapInterface;
    current: Station2;
    currentBatchId: number | null,
}

export const useStationStore = defineStore('station', {
    state: (): State => ({
        dashboard: {} as StationDashboardInterface,
        listKeys: [],
        list: {} as StationListMapInterface,
        current: {} as Station2,
        currentBatchId: null
    }),
    actions: {
        setList(list: Array<StationListInterface>) {
            const output: StationListMapInterface = {} as StationListMapInterface;

            for (const item of list) {
                if (output[item.station.id.type]) {
                    output[item.station.id.type].push(item);
                } else {
                    output[item.station.id.type] = [item];
                    this.listKeys.push(item.station.id.type);
                }
            }

            this.list = output;
        },
        setDashboard(dashboard: StationDashboardInterface) {
            this.dashboard = dashboard;
        },
        setCurrent(station: Station2) {
            this.current = station;
        },
        setCurrentBatchId(batchId: number) {
            this.currentBatchId = batchId;
        }
    }
});
