import * as moment from 'moment';
class ValidatorsFn {
  static validateDate(control){

    const value = control.value;
    if (moment(value, 'DD/MM/YYYY') >= moment()) {
      return { isValidDate: 'Data de nascimento não pode ser maior ou igual a data atual' }
    }
    return moment(value, 'DD/MM/YYYY').isValid() ? null : { isValidDate: 'Preencha uma data de nascimento válida' }
  };
  static isDateMoreThan(minYear, label?: string){
    return (control): { [key: string]: any } | null => {
      if (!control.value || control.value === '') {
        return null;
      }
      label = label ? label : 'nome';
      const date = control.value;
      if (!date || date.length <= 9) { return null; }
      const dayObj = `${date[0]}${date[1]}`;
      const monthObj = `${date[3]}${date[4]}`;
      const yearObj = `${date[6]}${date[7]}${date[8]}${date[9]}`;
      const dateObj = new Date(+yearObj, +monthObj - 1, +dayObj);
      const month = dateObj.getUTCMonth();
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      const result = new Date(year + minYear, month, day) <= new Date();
      return result ? null : { isDateMoreThanCustom: `É necessário ter no mínimo ${minYear} anos para continuar` };
    };
  }
}
export default ValidatorsFn;
