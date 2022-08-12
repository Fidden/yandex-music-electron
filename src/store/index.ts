import { defineStore } from 'pinia';
import { AppStateEnum } from '@/enums/AppStateEnum';

interface State {
    appState: AppStateEnum;
    userToken: string;
}

export const useMainStore = defineStore('main', {
    state: (): State => ({
        appState: AppStateEnum.LOADING,
        userToken: ''
    }),
    actions: {
        setAppState(value: AppStateEnum) {
            this.appState = value;
        },
        setUserToken(token: string) {
            this.userToken = token;
        }
    }
});
