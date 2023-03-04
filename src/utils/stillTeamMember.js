"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stillTeamMember = void 0;
const ramda_1 = require("ramda");
const stillTeamMember = (currentTeam = {}, twitchTeams = []) => (0, ramda_1.any)((0, ramda_1.propEq)('team_name', currentTeam))(twitchTeams);
exports.stillTeamMember = stillTeamMember;
