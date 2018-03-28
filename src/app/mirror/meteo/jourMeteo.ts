export class jourMeteo {

private date: string;
private condition: string;
private conditionLabel: string;
private tmax: string;
private tmin: string;
private tmp: string;
private imgUrl: string;
private day: string;
private month : string;
private dayNumber : string;
private wind_speed : number;
private wind_dir : string;


constructor(date:string, condition:string, condtionLabel:string, tmax:string, tmin:string, tmp:string,  wind_speed : number, wind_dir: string) {
  let dateString = date.split(".");
  this.date = date;
  this.condition = condition;
  this.conditionLabel = condtionLabel;
  this.tmax = tmax != null ? 'Max : '+tmax+'° ' : tmax;
  this.tmin = tmin != null ? 'Min : '+tmin+'° ' : tmin;
  this.tmp = tmp != null ? ' '+tmp+'° ' : tmp;
  this.wind_dir = 'Vent : '+wind_dir;
  this.wind_speed = wind_speed;
  this.day = jourMeteo.convertToDay(dateString);
  this.month = jourMeteo.convertToMonth(dateString);
  this.dayNumber = dateString[0];
  this.createImgUrl();

}

  getDate(){
    return this.date;
  }
  getCondition(){
    return this.condition;
  }
  getConditionLabel(){
    return this.conditionLabel;
  }
  getTmax(){
    return this.tmax;
  }
  getTmin(){
    return this.tmin;
  }
  getTmp(){
    return this.tmp;
  }
  createImgUrl(){
    this.imgUrl = 'assets/img/'+this.conditionLabel+'.png';
  }

  private static convertToDay(dateString) : string{

    let date = new Date(dateString[2]+'.'+dateString[1]+'.'+dateString[0]);

    let weekday = new Array(7);
    weekday[0] = "Dimanche";
    weekday[1] = "Lundi";
    weekday[2] = "Mardi";
    weekday[3] = "Mercredi";
    weekday[4] = "Jeudi";
    weekday[5] = "Vendredi";
    weekday[6] = "Samedi";
    return  weekday[date.getDay()];
  }

  private static convertToMonth(dateString) : string {

    let date = new Date(dateString[2]+'.'+dateString[1]+'.'+dateString[0]);

    let tab_mois=["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return tab_mois[date.getMonth()];
  }
}
