namespace $.$$ {
	export class $bog_blitz_session extends $giper_baza_dict.with({
		Quiz_link: $giper_baza_atom_text,
		Game_state: $giper_baza_atom_text,
		Current_question: $giper_baza_atom_real,
		Round_start: $giper_baza_atom_real,
		Paused_at: $giper_baza_atom_real,
	}) {}

	export const $bog_blitz_session_fields = new Set([
		'Quiz_link',
		'Game_state',
		'Current_question',
		'Round_start',
		'Paused_at',
	])
}
