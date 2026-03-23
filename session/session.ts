namespace $.$$ {
	export class $bog_blitz_session extends $giper_baza_dict.with({
		Quiz_link: $giper_baza_atom_text,
		Game_state: $giper_baza_atom_text,
		Current_question: $giper_baza_atom_real,
		Round_start: $giper_baza_atom_real,
		Paused_at: $giper_baza_atom_real,
		Answers_key_land: $giper_baza_atom_text,
		Reveal_correct: $giper_baza_atom_text,
		Multi_correct: $giper_baza_atom_bool,
	}) {}

	export const $bog_blitz_session_fields = new Set([
		'Quiz_link',
		'Game_state',
		'Current_question',
		'Round_start',
		'Paused_at',
		'Answers_key_land',
		'Reveal_correct',
		'Multi_correct',
	])

	/** Зашифрованный ленд — только хост читает. JSON с правильными ответами */
	export class $bog_blitz_answers_key extends $giper_baza_dict.with({
		Data: $giper_baza_atom_text,
	}) {}
}
