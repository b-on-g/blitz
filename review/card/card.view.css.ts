namespace $ {
	$mol_style_define($bog_blitz_review_card, {
		background: { color: $mol_theme.card },
		border: { radius: $mol_gap.round },
		padding: $mol_gap.block,
		boxShadow: `0 0 0 1px ${$mol_theme.line}`,
		flex: {
			direction: 'column',
		},
		gap: $mol_gap.space,

		Header: {
			flex: {
				direction: 'row',
				wrap: 'wrap',
			},
			justify: { content: 'space-between' },
			align: { items: 'baseline' },
			gap: $mol_gap.space,
		},

		Author_name: {
			font: { weight: 700, size: '1rem' },
		},

		Created_time: {
			font: { size: '0.85rem' },
			opacity: 0.6,
		},

		Text_body: {
			font: { size: '1rem' },
			whiteSpace: 'pre-wrap',
		},

		Reply_wrap: {
			flex: {
				direction: 'column',
			},
			margin: { top: $mol_gap.space },
			padding: $mol_gap.block,
			background: { color: $mol_theme.back },
			border: { radius: $mol_gap.round },
			gap: $mol_gap.space,
		},

		Reply_header: {
			flex: {
				direction: 'row',
				wrap: 'wrap',
			},
			justify: { content: 'space-between' },
			align: { items: 'baseline' },
			gap: $mol_gap.space,
		},

		Reply_author: {
			font: { weight: 700, size: '0.95rem' },
		},

		Reply_created: {
			font: { size: '0.8rem' },
			opacity: 0.6,
		},

		Reply_body: {
			font: { size: '0.95rem' },
			whiteSpace: 'pre-wrap',
		},
	})
}
