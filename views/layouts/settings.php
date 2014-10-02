<?php $this->beginContent('/layouts/main'); ?>
	<?php $this->renderPartial('/default/secondary-nav', array(
		'navigation' => array(
			'items' => array(
				array(
					'url' => $this->createUrl('/dashboard/settings'),
					'label' => NULL,
					'linkOptions' => array('class' => 'fa fa-gears', 'title' => Yii::t('Dashboard.views', 'General Settings')), 
					'active' => ($this->id == 'settings' && $this->action->id == 'index' ? true : false),
				),
				array(
					'url' => $this->createUrl('/dashboard/users'),
					'label' => NULL,
					'linkOptions' => array('class' => 'fa fa-group', 'title' => Yii::t('Dashboard.views', 'Users')),
					'active' => ($this->id == 'users')
				),
				array(
					'url' => $this->createUrl('/dashboard/categories'),
					'label' => NULL,
					'linkOptions' => array('class' => 'fa fa-list', 'title' => Yii::t('Dashboard.views', 'Categories')),
					'active' => ($this->id == 'categories')
				),
				array(
					'url' => $this->createUrl('/dashboard/settings/analytics'),
					'label' => NULL,
					'linkOptions' => array('class' => 'fa fa-bar-chart-o', 'title' => Yii::t('Dashboard.views', 'Analytics')),
					'active' => ($this->id == 'analytics' || ($this->id == 'settings' && $this->action->id == 'analytics') ? true : false)
				),
				array(
					'url' => $this->createUrl('/dashboard/settings/appearance'),
					'label' => NULL,
					'linkOptions' => array('class' => 'fa fa-eye', 'title' => Yii::t('Dashboard.views', 'Appearance')),
					'active' => ($this->id == 'settings' && $this->action->id == 'appearance' ? true : false)
				),
				array(
					'url' => $this->createUrl('/dashboard/settings/email'), 
					'label' => NULL,
					'linkOptions' => array('class' => 'fa fa-envelope-o', 'title' => Yii::t('Dashboard.views', 'Email Settings')),
					'active' => ($this->id == 'settings' && $this->action->id == 'email' ? true : false)
				),
				array(
					'url' => $this->createUrl('/dashboard/settings/social'),
					'label' => NULL,
					'linkOptions' => array('class' => 'fa fa-twitter', 'title' => Yii::t('Dashboard.views', 'Social Settings')),
					'active' => ($this->id == 'settings' && $this->action->id == 'social' ? true : false)
				),
				/*
				array(
					'url' => $this->createUrl('/dashboard/settings/plugins'),
					'label' => NULL,
					'itemOptions' => array('class' => 'fa fa-puzzle-piece', 'title' => Yii::t('Dashboard.views', 'Plugins')),
					'active' => ($this->id == 'settings' && $this->action->id == 'plugins' ? true : false)
				),
				*/
				array(
					'url' => $this->createUrl('/dashboard/settings/theme'), 
					'label' => NULL,
					'linkOptions' => array('class' => 'fa fa-desktop', 'title' => Yii::t('Dashboard.views', 'Active Theme Settings')),
					'active' => ($this->id == 'settings' && $this->action->id == 'theme')
				),
			)
		)
	)); ?>

	<main>
		<?php echo $content; ?>
	</main>
<?php $this->endContent(); ?>