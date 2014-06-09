<section id="analytics">
	<div class="nano" id="main">
		<div class="nano-content">
			<ul class="providers">
				<?php foreach ($model->groups() as $group=>$keys): ?>
					<?php $enabled = reset($keys); ?>
					<li class="provider" data-attr-name="<?php echo str_replace(' ', '_', $group); ?>">
						<div class="provider-inner <?php echo $model->$enabled ? 'enabled' : 'disabled'; ?>">
							<?php echo CHtml::image($this->asset.'/images/providers/' . str_replace('_', ' ', $group) . '/logo.png'); ?>
						</div>
					</li>
				<?php endforeach; ?>
				<div class="clear:both"></div>
			</ul>
		</div>
	</div>
</section>

<section id="analytics-sidebar" class="settings_container">
	<div class="nano" id="main">
		<div class="nano-content">
			<fieldset>
				<?php $htmlOptions = array('class' => 'pure-input-2-3'); ?>
				<?php $form = $this->beginWidget('ext.cii.widgets.CiiActiveForm', array(
				    'id'=>get_class($model),
				    'htmlOptions' => array(
				    	'class' => 'pure-form pure-form-aligned'
				    )
				)); ?>
					<?php foreach ($model->groups() as $group=>$keys): ?>
						<div class="options-panel <?php echo str_replace(' ', '_', $group); ?>">
							<legend><?php echo Yii::t('Dashboard.main', '{{group}} Settings', array('{{group}}' => str_replace('_', ' ', $group))); ?></legend>

							<?php foreach ($keys as $key): ?>
								<div class="pure-control-group">
									<?php $validators = $model->getValidators($key); ?>
									<?php if (isset($validators[0]) && get_class($validators[0]) == "CBooleanValidator"): ?>
										<?php echo $form->toggleButtonRowFix($model, $key, $htmlOptions); ?>
									<?php else: ?>
										<?php echo $form->textFieldRowLabelFix($model, $key, $htmlOptions); ?>
									<?php endif; ?>
								</div>
							<?php endforeach; ?>
						</div>
					<?php endforeach; ?>
				<?php $this->endWidget(); ?>
			</fieldset>
		</div>
	</div>
</section>
<?php Yii::app()->clientScript->registerScript('analytics-settings', 'Analytics.init();'); ?>

