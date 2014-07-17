<section id="installed-themes" class="settings_container_u">
		<div class="nano" id="main">
			<div class="nano-content">
				<fieldset>
					<legend><?php echo Yii::t('Dashboard.main', 'Installed Themes'); ?></legend>
					<div class="pure-g">
						<?php foreach ($model->getThemes() as $name=>$attributes): ?>
							<div class="theme-details-container">
								<div class="pure-u-1-2">
									<header>
										<h2><?php echo CiiInflector::titleize($name); ?></h2>
										<span class="updater pure-button pure-button-xsmall pure-button-primary" data-attr-name="<?php echo $name; ?>">
											<i class="fa fa-spinner fa-spin"></i>
											<?php echo Yii::t('Dashboard.main', 'Checking for Updates...'); ?>
										</span>
										<span class="update-available pure-button pure-button-xsmall pure-button-warning-pulse" data-attr-name="<?php echo $name; ?>">
											<?php echo Yii::t('Dashboard.main', 'Update Available!'); ?>
										</span>
										<span class="uptodate pure-button pure-button-xsmall pure-button-success">
											<?php echo Yii::t('Dashboard.main', 'Up to Date!'); ?>
										</span>
										<span class="updating pure-button pure-button-xsmall pure-button-primary-pulse">
											<i class="fa fa-spinner fa-spin"></i>
											<?php echo Yii::t('Dashboard.main', 'Update in progress...'); ?>
										</span>
										<span class="updatefailed pure-button pure-button-xsmall pure-button-error-pulse">
											<?php echo Yii::t('Dashboard.main', 'Update failed!'); ?>
										</span>

										<?php if (Cii::getConfig('theme') == $name): ?>
											<span class="activetheme pure-button pure-button-xsmall pure-button-primary">
												<?php echo Yii::t('Dashboard.main', 'Current Theme'); ?>
											</span>
										<?php else: ?>
											<span class="usetheme pure-button pure-button-xsmall pure-button-secondary" data-attr-name="<?php echo $name; ?>">
												<?php echo Yii::t('Dashboard.main', 'Use This Theme'); ?>
											</span>
										<?php endif; ?>

										<div class="clearfix"></div>
									</header>

									<div class="clearfix"></div>
			
									<div class="sub-details">
										<?php if (file_exists($attributes['path'].DS.'VERSION')): ?>
											<span class="version"><?php echo file_get_contents($attributes['path'].DS.'VERSION'); ?></span>
										<?php endif; ?>
									</div>

									<div class="theme-details">
										<?php if (file_exists($attributes['path'].DS.'README.md')): ?>
											<?php echo $md->safeTransform(file_get_contents($attributes['path'].DS.'README.md')); ?>
										<?php endif; ?>
									</div>

								</div>
								<div class="pure-u-11-24 badge">
									<?php $badge = Yii::app()->assetManager->publish(YiiBase::getPathOfAlias('webroot.themes') .'/'. $name . '/default.png', true, -1, YII_DEBUG); ?>
									<?php echo CHtml::image($badge); ?>
								</div>
							</div>
						<?php endforeach; ?>
					</div>
				</fieldset>
			</div>
		</div>
</section>

<?php Yii::app()->clientScript->registerScript('ThemesLoader', 'Theme.init();'); ?>