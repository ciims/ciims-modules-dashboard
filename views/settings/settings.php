<?php 
	$this->widget('CiiSettingsForm', array('model' => $model));

	if ($this->action->id == 'index')
		echo CHtml::link(Yii::t('Dashboard.main', 'Flush Cache'), '#', array('id'=>'flush_cache', 'class' => 'pure-button pure-button-error pure-button-xsmall'));
	Yii::app()->clientScript->registerScript('nanoscroller', 'Settings.registerSettings();');
	Yii::app()->clientScript->registerScript('flush_cache', 'Settings.flushCache();');
