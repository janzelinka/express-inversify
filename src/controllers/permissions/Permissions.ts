import { User } from "../../db/entity/User";
import { ERoles } from "../../enums/Roles";

export const ONLY_ADMINS = (decoded: User) => decoded.role.id === ERoles.ADMIN;
export const ONLY_USERS = (decoded: User) => decoded.role.id === ERoles.USER;
export const PUBLIC = (decoded: User) => true;
