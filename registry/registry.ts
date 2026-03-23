namespace $.$$ {

	/** Минимальная ссылка в home land — указывает на отдельный ленд с квизами */
	export class $bog_blitz_home_ref extends $giper_baza_dict.with({
		Quizzes_land: $giper_baza_atom_text,
	}) {}

	/** Живёт в отдельном ленде, не в home land */
	export class $bog_blitz_registry extends $giper_baza_dict.with({
		Quizzes: $giper_baza_list_link_to(() => $bog_blitz_quiz),
		Shared_quizzes: $giper_baza_list_link_to(() => $bog_blitz_quiz),
	}) {}
}
