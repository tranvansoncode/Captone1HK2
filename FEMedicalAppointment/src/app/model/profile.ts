import {DatePipe} from "@angular/common";

export interface Profile {
  id: number,
  name: string,
  dayOfBirthday:Date,
  gender: number,
  address: string
  phone: string
  username: string,
  email: string,
  avatar: string
}
