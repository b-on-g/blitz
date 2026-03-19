namespace $.$$ {
	export class $bog_blitz_quiz extends $giper_baza_dict.with({
		Title: $giper_baza_atom_text,
		Questions: $giper_baza_list_link_to(() => $bog_blitz_question),
		Time_read: $giper_baza_atom_real,
		Time_answer: $giper_baza_atom_real,
		Time_leaderboard: $giper_baza_atom_real,
		Time_reveal: $giper_baza_atom_real,
		Points_base: $giper_baza_atom_real,
		Time_multiplier: $giper_baza_atom_real,
		Manual_mode: $giper_baza_atom_bool,
		Game_state: $giper_baza_atom_text,
		Current_question: $giper_baza_atom_real,
		Round_start: $giper_baza_atom_real,
		Paused_at: $giper_baza_atom_real,
	}) {}

	export const $bog_blitz_quiz_fields = new Set([
		'Title',
		'Questions',
		'Time_read',
		'Time_answer',
		'Time_leaderboard',
		'Time_reveal',
		'Points_base',
		'Time_multiplier',
		'Manual_mode',
		'Game_state',
		'Current_question',
		'Round_start',
		'Paused_at',
		'Paused_a',
	])
}
