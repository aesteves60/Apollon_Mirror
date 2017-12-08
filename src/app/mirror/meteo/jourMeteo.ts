export class jourMeteo {

private date: string;
private condition: string;
private conditionLabel: string;
private tmax: string;
private tmin: string;
private tmp: string;
private imgUrl: string;
private day: string;

constructor(date:string,condition:string,condtionLabel:string,tmax:string,tmin:string,tmp:string) { 
  this.date = date;
  this.condition = condition;
  this.conditionLabel = condtionLabel;
  this.tmax = tmax != null ? 'Max : '+tmax+' C°' : tmax;
  this.tmin = tmin != null ? 'Min : '+tmin+' C°' : tmin;
  this.tmp = tmp != null ? tmp+' C°' : tmp;
  this.createImgUrl();
  this.convertToDay();
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
  convertToDay(){
    var dateString = this.date.split(".");
    var date = new Date(Number(dateString[0]),Number(dateString[1]),Number(dateString[2]));
    var day = date.getDay();
    var weekday = new Array(7);
  weekday[0] =  "Dimanche";
  weekday[1] = "Lundi";
  weekday[2] = "Mardi";
  weekday[3] = "Mercredi";
  weekday[4] = "Jeudi";
  weekday[5] = "Vendredi";
  weekday[6] = "Samedi";
  this.day = weekday[day];

  }
}