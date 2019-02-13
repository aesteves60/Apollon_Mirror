const weekday = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi',
'Jeudi', 'Vendredi', 'Samedi'];

const tab_mois = ['Janvier', 'Février', 'Mars', 'Avril',
'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export class JourMeteo {

    private date: string;
    private condition: string;
    private conditionLabel: string;
    private tmax: string;
    private tmin: string;
    private tmp: string;
    private imgUrl: string;
    private day: string;
    private month: string;
    private dayNumber: string;
    private wind_speed: number;
    private wind_dir: string;

    constructor(date: string, condition: string, condtionLabel: string,
        tmax: string, tmin: string, tmp: string, wind_speed: number, wind_dir: string) {
        const dateString = date.split('.');
        const d = new Date(dateString[2] + '-' + dateString[1] + '-' + dateString[0]);
        this.date = date;
        this.condition = condition;
        this.conditionLabel = condtionLabel;
        this.tmax = tmax != null ? '' + tmax + '°' : tmax;
        this.tmin = tmin != null ? '' + tmin + '°' : tmin;
        this.tmp = tmp != null ? ' ' + tmp + '°' : tmp;
        this.wind_dir = 'Vent : ' + wind_dir;
        this.wind_speed = wind_speed;
        this.day = JourMeteo.convertToDay(d);
        this.month = JourMeteo.convertToMonth(d);
        this.dayNumber = dateString[0];
        this.createImgUrl();

    }

    private static convertToDay(date): string {
        return weekday[date.getDay()];
    }

    private static convertToMonth(date): string {
        return tab_mois[date.getMonth()];
    }

    getDate() {
        return this.date;
    }
    getCondition() {
        return this.condition;
    }
    getConditionLabel() {
        return this.conditionLabel;
    }
    getTmax() {
        return this.tmax;
    }
    getTmin() {
        return this.tmin;
    }
    getTmp() {
        return this.tmp;
    }
    createImgUrl() {
        this.imgUrl = 'assets/img/' + this.conditionLabel + '.png';
    }
}
