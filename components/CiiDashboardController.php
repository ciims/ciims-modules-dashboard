<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class CiiDashboardController extends CiiController
{
	/**
	 * Retrieve assetManager from anywhere without having to instatiate this code
	 * @return CAssetManager
	 */
	public function getAsset($dist=false)
	{
		return Yii::app()->assetManager->publish(YiiBase::getPathOfAlias('application.modules.dashboard.assets'), true, -1, YII_DEBUG);
	}

	/**
	 * Before action method
	 * @param  CAction $action The aciton
	 * @return boolean
	 */
	public function beforeAction($action)
	{
		// Redirect to SSL if this is set in the dashboard
		if (!Yii::app()->getRequest()->isSecureConnection && Cii::getConfig('forceSecureSSL', false))
            $this->redirect('https://' . Yii::app()->getRequest()->serverName . Yii::app()->getRequest()->requestUri);

        Yii::app()->setTheme(NULL);
        return parent::beforeAction($action);
	}

	/**
	 * @return string[] action filters
	 */
	public function filters()
	{
		return array(
			'accessControl'
		);
	}

	/**
	 * Fix for getPageTitle() displaying the wrong data
	 * @todo: Find where this method is being overwritten. vendor/charlesportwoodii/cii (???) is where I'd expect, but it's not there
	 * Otherwise it defaults to Yii::app()->name | {{something}} (???)
	 */
	public function getPageTitle()
	{
		return CiiInflector::titleize($this->id);
	}

    /**
     * Handles errors
     */
    public function actionError()
    {
        if (Yii::app()->user->isGuest)
           return $this->redirect($this->createUrl('/login?next=' . Yii::app()->request->requestUri));

        if($error=Yii::app()->errorHandler->error)
        {
            if(Yii::app()->request->isAjaxRequest)
                echo $error['message'];
            else
                $this->render('error', array('error' => $error));
        }
        else
            $this->redirect($this->createUrl('/error/403'));
    }

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow',  // allow authenticated admins to perform any action
				'users'=>array('@')
			),
			array('deny',  // deny all users
				'users'=>array('*'),
				'deniedCallback' => array($this, 'actionError')
			),
		);
	}

	/**
	 * @var string the default layout for the controller view. Defaults to '//layouts/column1',
	 * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
	 */
	public $layout='default';
}
