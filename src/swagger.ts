import * as z from 'zod';
import { createDocument } from 'zod-openapi';
import { UserLoginRequestSchema, UserRegisterRequestSchema } from './types/users.type';
import { CategoryCreateRequestSchema, CategoryQueryRequestSchema, CategoryUpdateRequestSchema } from './types/categories.type';
import { SubCategoryCreateRequestSchema, SubCategoryQueryRequestSchema, SubCategoryUpdateRequestSchema } from './types/subcategories.type';
import { TrackingTypeCreateRequestSchema, TrackingTypeQueryRequestSchema, TrackingTypeUpdateRequestSchema } from './types/trackingtypes.type';
import { ActivityCreateRequestSchema, ActivityQueryRequestSchema, ActivityUpdateRequestSchema } from './types/activities.type';
import { ActivityLogsCreateRequestSchema, ActivityLogsQueryRequestSchema, ActivityLogsUpdateRequestSchema } from './types/activitylogs.type';

export const swaggerDocument = createDocument({
    openapi: '3.1.0',
    info: {
        title: 'Thesis Project API',
        version: '1.0.0',
        description: 'Activity Tracking System API Documentation'
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Development'
        },
    ]
    ,
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            },
        }
    },
    security: [{ bearerAuth: [] }],
    paths: {
        '/api/v1/auth/register': {
            post: {
                summary: 'User Registration',
                description: 'Create a new user account in the system',
                tags: ['Auth'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: UserRegisterRequestSchema
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'User successfully registered'
                    },
                    '400': {
                        description: 'Validation error - check request body'
                    },
                    '409': {
                        description: 'User already exists with this email'
                    }
                }
            }
        },
        '/api/v1/auth/login': {
            post: {
                summary: 'User Login',
                description: 'Authenticate user and receive JWT token',
                tags: ['Auth'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: UserLoginRequestSchema
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Login successful, JWT token returned'
                    },
                    '401': {
                        description: 'Invalid email or password'
                    },
                    '404': {
                        description: 'User not found'
                    }
                }
            }
        },
        '/api/v1/categories': {
            post: {
                summary: 'Create Category',
                description: 'Create a new category',
                tags: ['Categories'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: CategoryCreateRequestSchema
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Category successfully created'
                    },
                    '400': {
                        description: 'Validation error'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    }
                }
            },
            get: {
                summary: 'Get All Categories',
                description: 'Retrieve all categories with optional filtering',
                tags: ['Categories'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: false,
                    content: {
                        'application/json': {
                            schema: CategoryQueryRequestSchema
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Categories retrieved successfully'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    }
                }
            }
        },
        '/api/v1/categories/{id}': {
            get: {
                summary: 'Get Category by ID',
                description: 'Retrieve a specific category by its ID',
                tags: ['Categories'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Category ID',
                        schema: { type: 'number' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Category retrieved successfully'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Category not found'
                    }
                }
            },
            put: {
                summary: 'Update Category',
                description: 'Update an existing category',
                tags: ['Categories'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Category ID',
                        schema: { type: 'number' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: CategoryUpdateRequestSchema
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Category successfully updated'
                    },
                    '400': {
                        description: 'Validation error'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Category not found'
                    }
                }
            },
            delete: {
                summary: 'Delete Category',
                description: 'Delete a category by its ID',
                tags: ['Categories'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Category ID',
                        schema: { type: 'number' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Category successfully deleted'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Category not found'
                    }
                }
            }
        },
        '/api/v1/subcategories': {
            post: {
                summary: 'Create Subcategory',
                description: 'Create a new subcategory under a category',
                tags: ['Subcategories'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: SubCategoryCreateRequestSchema
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Subcategory successfully created'
                    },
                    '400': {
                        description: 'Validation error'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    }
                }
            },
            get: {
                summary: 'Get All Subcategories',
                description: 'Retrieve all subcategories with optional filtering',
                tags: ['Subcategories'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: false,
                    content: {
                        'application/json': {
                            schema: SubCategoryQueryRequestSchema
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Subcategories retrieved successfully'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    }
                }
            }
        },
        '/api/v1/subcategories/{id}': {
            get: {
                summary: 'Get Subcategory by ID',
                description: 'Retrieve a specific subcategory by its ID',
                tags: ['Subcategories'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Subcategory ID',
                        schema: { type: 'number' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Subcategory retrieved successfully'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Subcategory not found'
                    }
                }
            },
            put: {
                summary: 'Update Subcategory',
                description: 'Update an existing subcategory',
                tags: ['Subcategories'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Subcategory ID',
                        schema: { type: 'number' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: SubCategoryUpdateRequestSchema
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Subcategory successfully updated'
                    },
                    '400': {
                        description: 'Validation error'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Subcategory not found'
                    }
                }
            },
            delete: {
                summary: 'Delete Subcategory',
                description: 'Delete a subcategory by its ID',
                tags: ['Subcategories'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Subcategory ID',
                        schema: { type: 'number' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Subcategory successfully deleted'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Subcategory not found'
                    }
                }
            }
        },
        '/api/v1/trackingtypes': {
            post: {
                summary: 'Create Tracking Type',
                description: 'Create a new tracking type',
                tags: ['Tracking Types'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: TrackingTypeCreateRequestSchema
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Tracking type successfully created'
                    },
                    '400': {
                        description: 'Validation error'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    }
                }
            },
            get: {
                summary: 'Get All Tracking Types',
                description: 'Retrieve all tracking types with optional filtering',
                tags: ['Tracking Types'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: false,
                    content: {
                        'application/json': {
                            schema: TrackingTypeQueryRequestSchema
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Tracking types retrieved successfully'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    }
                }
            }
        },
        '/api/v1/trackingtypes/{id}': {
            get: {
                summary: 'Get Tracking Type by ID',
                description: 'Retrieve a specific tracking type by its ID',
                tags: ['Tracking Types'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Tracking Type ID',
                        schema: { type: 'number' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Tracking type retrieved successfully'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Tracking type not found'
                    }
                }
            },
            put: {
                summary: 'Update Tracking Type',
                description: 'Update an existing tracking type',
                tags: ['Tracking Types'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Tracking Type ID',
                        schema: { type: 'number' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: TrackingTypeUpdateRequestSchema
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Tracking type successfully updated'
                    },
                    '400': {
                        description: 'Validation error'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Tracking type not found'
                    }
                }
            },
            delete: {
                summary: 'Delete Tracking Type',
                description: 'Delete a tracking type by its ID',
                tags: ['Tracking Types'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Tracking Type ID',
                        schema: { type: 'number' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Tracking type successfully deleted'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Tracking type not found'
                    }
                }
            }
        },
        '/api/v1/activities': {
            post: {
                summary: 'Create Activity',
                description: 'Create a new activity',
                tags: ['Activities'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: ActivityCreateRequestSchema
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Activity successfully created'
                    },
                    '400': {
                        description: 'Validation error'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    }
                }
            },
            get: {
                summary: 'Get All Activities',
                description: 'Retrieve all activities with optional filtering',
                tags: ['Activities'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: false,
                    content: {
                        'application/json': {
                            schema: ActivityQueryRequestSchema
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Activities retrieved successfully'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    }
                }
            }
        },
        '/api/v1/activities/{id}': {
            get: {
                summary: 'Get Activity by ID',
                description: 'Retrieve a specific activity by its ID',
                tags: ['Activities'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Activity ID',
                        schema: { type: 'number' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Activity retrieved successfully'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Activity not found'
                    }
                }
            },
            put: {
                summary: 'Update Activity',
                description: 'Update an existing activity',
                tags: ['Activities'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Activity ID',
                        schema: { type: 'number' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: ActivityUpdateRequestSchema
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Activity successfully updated'
                    },
                    '400': {
                        description: 'Validation error'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Activity not found'
                    }
                }
            },
            delete: {
                summary: 'Delete Activity',
                description: 'Delete an activity by its ID',
                tags: ['Activities'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Activity ID',
                        schema: { type: 'number' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Activity successfully deleted'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Activity not found'
                    }
                }
            }
        },
        '/api/v1/activitylogs': {
            post: {
                summary: 'Create Activity Log',
                description: 'Log a new activity with value and datetime',
                tags: ['Activity Logs'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: ActivityLogsCreateRequestSchema
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Activity log successfully created'
                    },
                    '400': {
                        description: 'Validation error'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    }
                }
            },
            get: {
                summary: 'Get All Activity Logs',
                description: 'Retrieve all activity logs with optional filtering',
                tags: ['Activity Logs'],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: false,
                    content: {
                        'application/json': {
                            schema: ActivityLogsQueryRequestSchema
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Activity logs retrieved successfully'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    }
                }
            }
        },
        '/api/v1/activitylogs/{id}': {
            get: {
                summary: 'Get Activity Log by ID',
                description: 'Retrieve a specific activity log by its ID',
                tags: ['Activity Logs'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Activity Log ID',
                        schema: { type: 'number' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Activity log retrieved successfully'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Activity log not found'
                    }
                }
            },
            put: {
                summary: 'Update Activity Log',
                description: 'Update an existing activity log',
                tags: ['Activity Logs'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Activity Log ID',
                        schema: { type: 'number' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: ActivityLogsUpdateRequestSchema
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Activity log successfully updated'
                    },
                    '400': {
                        description: 'Validation error'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Activity log not found'
                    }
                }
            },
            delete: {
                summary: 'Delete Activity Log',
                description: 'Delete an activity log by its ID',
                tags: ['Activity Logs'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Activity Log ID',
                        schema: { type: 'number' }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Activity log successfully deleted'
                    },
                    '401': {
                        description: 'Unauthorized - token required'
                    },
                    '404': {
                        description: 'Activity log not found'
                    }
                }
            }
        }
    }
});