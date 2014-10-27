<?php

class DashboardModule extends CWebModule
{
	public function init()
	{
        $this->layoutPath = Yii::getPathOfAlias('dashboard.views.layouts');

		// import the module-level models and components
		$this->setImport(array(
			'dashboard.components.*',
		));

        foreach(Yii::app()->log->routes as $k=>$v)
        {
            if (get_class($v) == 'CWebLogRoute')
                Yii::app()->log->routes[$k]->enabled = false; 
        }
      
		Yii::app()->setComponents(array(
            'errorHandler' => array(
            	'errorAction'  => 'dashboard/default/error',
        	),
            'messages' => array(
                'class' => 'ext.cii.components.CiiPHPMessageSource',
                'basePath' => Yii::getPathOfAlias('application.modules.dashboard')
            )
        ));
	}
}
