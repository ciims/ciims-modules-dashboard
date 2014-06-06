<?php

class SettingsController extends CiiDashboardController
{
	public $layout = 'settings';

	/**
	 * Provides "general" settings control
	 * @class GeneralSettings
	 */
	public function actionIndex()
	{		
		$this->render('settings', array(
			'model' => new GeneralSettings
		));
	}

	/**
	 * Provides basic email control
	 * @class EmailSettings
	 */
	public function actionEmail()
	{
		$this->render('email', array(
			'model' => new EmailSettings
		));
	}

	/**
	 * Provides "social" settings control
	 * @class GeneralSettings
	 */
	public function actionSocial()
	{
		$this->render('settings', array(
			'model' => new SocialSettings
		));
	}

	/**
	 * Provides "general" settings control
	 * @class GeneralSettings
	 */
	public function actionAnalytics()
	{
		$this->render('settings', array(
			'model' => new AnalyticsSettings
		));
	}

	/**
	 * Provides theme control settings
	 * @class ThemeSettings
	 */
	public function actionAppearance()
	{
		$this->render('settings', array(
			'model' => new ThemeSettings
		));
	}

	/**
	 * Provides control for Theme management
	 * @param  string $type The type we want to display
	 */
	public function actionTheme()
	{
		$theme = Cii::getConfig('theme', 'default');

		if (!file_exists(Yii::getPathOfAlias('webroot.themes.' . $theme) . DIRECTORY_SEPARATOR . 'Theme.php'))
			throw new CHttpException(400, Yii::t('Dashboard.main',  'The requested theme type is not set. Please set a theme before attempting to change theme settings'));

		Yii::import('webroot.themes.' . $theme . '.Theme');

		try {
			$model = new Theme();
		} catch(Exception $e) {
			throw new CHttpException(400,  Yii::t('Dashboard.main', 'The requested theme type is not set. Please set a theme before attempting to change theme settings'));
		}
		
		$this->render('settings', array(
			'model' => $model
		));
	}

	/**
	 * Plugin Management 
	 */
	public function actionPlugins()
	{
		throw new CHttpException(400,  Yii::t('Dashboard.main', 'Plugins are not yet supported'));
	}
	
	/**
	 * System Management
	 */
	public function actionSystem()
	{
		$this->render('system');
	}
}